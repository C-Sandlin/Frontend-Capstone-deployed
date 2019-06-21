import React, { Component } from "react";
import { FiEdit, FiXSquare, FiCheck, FiX, FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import API from "../db/API";
import { getUserFromLocalStorage } from '../login/LoginHandler'

import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { thisTypeAnnotation } from "@babel/types";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const theUserIdIs = getUserFromLocalStorage()


export default class AllCmCard extends Component {

    state = {
        showinfo: false,
        editModal: false,
        userId: theUserIdIs.id,
        editTitle: this.props.copingMechTitle,
        editUrl: this.props.copingMechUrl,
        editInfo: this.props.copingMechInfo,
        editInfo2: this.props.copingMechInfo2,
        editCopingLabel: "Select a mood category for this coping mechanism",
        editCopingMoodCategoryId: this.props.copingMechMoodCategory,
        upvote: false,
        downvote: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };


    toggleEditModal = () => {
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    }

    toggleExpansion = () => {
        this.setState({ showinfo: !this.state.showinfo })
    }

    updateCmForm = (value) => {
        const newObj = {
            id: value,
            userId: this.state.userId,
            title: this.state.editTitle,
            url: this.state.editUrl,
            info: this.state.editInfo,
            info2: this.state.editInfo2,
            moodCategoryId: parseInt(this.state.editCopingMoodCategoryId)
        }
        console.log("update", newObj)
        let newState = {
            allCopingMechs: [],
            editModal: !this.state.editModal
        }

        API.editCopingMech(newObj.id, newObj)
            .then(() => this.props.loadCms())
            .then(() => this.setState({ editModal: false }))
    }


    deleteCm = (id) => {

        API.deleteMech(id)
            .then(() => this.props.loadCms())
            .then(() => this.setState({ editModal: false }))
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
            .then(() => console.log("downVote allcard", this.props))
            .then(() => this.setState({ downvote: true }))
    }



    render() {
        return (
            <>
                <article key={this.props.copingMechId} className="card" onDoubleClick={this.toggleEditModal}>
                    <div className="thumb" style={{ backgroundImage: `url(${this.props.copingMechUrl})` }}></div>
                    <div className="infos">
                        <p className="double-click-message">Double-click the card to edit or delete</p>

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
                <Modal size="lg" isOpen={this.state.editModal} className={this.props.className} toggle={this.toggleEditModal} centered={true}>
                    <ModalHeader toggle={this.toggleEditModal} >
                        Edit Coping Mechanism
                    </ModalHeader>
                    <ModalBody>
                        < Form >
                            <FormGroup>
                                <Label for="editTitle">Title</Label>
                                <Input type="text" name="title" id="editTitle" onChange={this.handleFieldChange} defaultValue={this.props.copingMechTitle} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="editInfo">Description</Label>
                                <Input type="text" name="info" id="editInfo" onChange={this.handleFieldChange} defaultValue={this.props.copingMechInfo} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="editInfo2">Additional Information</Label>
                                <Input type="text" name="editInfo2" id="editInfo2" onChange={this.handleFieldChange} defaultValue={this.props.copingMechInfo2} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="editUrl">Image Url</Label>
                                <Input type="text" name="url" id="editUrl" onChange={this.handleFieldChange} defaultValue={this.props.copingMechUrl} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="editCopingMoodCategoryId">Mood Category</Label>
                                <Input type="select" id="editCopingMoodCategoryId" onChange={this.handleFieldChange} value={this.props.copingMechMoodCategory}>
                                    <option ></option>
                                    <option value={5}>Great</option>
                                    <option value={4}>Good</option>
                                    <option value={3}>Okay</option>
                                    <option value={2}>Not So Great</option>
                                    <option value={1}>Bad</option>
                                </Input>
                            </FormGroup>
                        </Form >
                        <div id="cm-btn-container">
                            <p id="submit-cm-btn" onClick={() => this.updateCmForm(this.props.copingMechId)}><FiCheck />  Submit</p>
                            <p id="delete-cm-btn" onClick={() => this.deleteCm(this.props.copingMechId)}><FiX />  Delete</p>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}
