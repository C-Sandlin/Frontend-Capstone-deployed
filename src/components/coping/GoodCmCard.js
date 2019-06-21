import React, { Component } from "react";
import { IconContext } from "react-icons";
import { FaRegGrin } from "react-icons/fa";
import { FiEdit, FiXSquare, FiCheck, FiX, FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import API from "../db/API";

export default class GoodCmCard extends Component {

    state = {
        showinfo: false,
        upvote: false,
        downvote: false,
    }

    toggleExpansion = () => {
        this.setState({ showinfo: !this.state.showinfo })
    }

    upVote = (value) => {
        const newScore = {
            id: value,
            score: this.props.copingMechScore + 1,
        }

        API.editCopingMech(newScore.id, newScore)
            .then(() => this.props.loadCms())
            .then(() => this.setState({ upvote: true }))
    }

    downVote = (value) => {
        const newScore = {
            id: value,
            score: (this.props.copingMechScore <= 0) ? (0) : (this.props.copingMechScore - 1),
        }

        API.editCopingMech(newScore.id, newScore)
            .then(() => this.props.loadCms())
            .then(() => this.setState({ downvote: true }))
    }


    render() {
        return (
            <article key={this.props.copingMechId} className="card">
                <div className="thumb" style={{ backgroundImage: `url(${this.props.copingMechUrl})` }}></div>
                <div className="infos">
                    <h2 className="title">{this.props.copingMechTitle} {this.props.selectedMood} <FaRegGrin className="flag" /> </h2>
                    <h3 className="date">{this.props.copingMechInfo}</h3>
                    <p className="txt">{this.props.copingMechInfo2}</p>
                    <div className="cm-score">
                        <IconContext.Provider value={{ size: '1.25em' }} >
                            <button className="vote-button" disabled={this.state.upvote} onClick={() => this.upVote(this.props.copingMechId)}><FiArrowUpCircle /></button>
                            <p className="vote-text">  Rating: {this.props.copingMechScore}</p>
                            <button className="vote-button" disabled={this.state.downvote} onClick={() => this.downVote(this.props.copingMechId)}><FiArrowDownCircle />  </button>
                        </IconContext.Provider>
                    </div>

                </div>
            </article>
        )
    }
}