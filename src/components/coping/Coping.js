import React, { Component } from "react";
import Carousel from 're-carousel'
import IndicatorDots from './indicator-dots'
import AllCmCard from './AllCmCard'
import GenericCmCard from './GenericCmCard'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import cardCss from './cardCss.css'
import { getUserFromLocalStorage } from '../login/LoginHandler'

import API from "../db/API"

import { FiPlus, FiGrid, FiCheck } from "react-icons/fi"


const theUserIdIs = getUserFromLocalStorage()

export default class Coping extends Component {

    state = {
        userId: (theUserIdIs) ? (theUserIdIs.id) : "",
        allCopingMechs: [],
        greatCopingMechs: [],
        goodCopingMechs: [],
        okayCopingMechs: [],
        notSoGreatCopingMechs: [],
        badCopingMechs: [],
        addModal: false,
    }

    componentDidMount() {
        this.loadCms()
    }

    toggleAddModal = () => {
        this.setState(prevState => ({
            addModal: !prevState.addModal
        }));
    }

    loadCms = () => {
        const newState = {
            allCopingMechs: [],
            greatCopingMechs: [],
            goodCopingMechs: [],
            okayCopingMechs: [],
            notSoGreatCopingMechs: [],
            badCopingMechs: [],
        }

        API.getAllCopingMechs()
            .then(copingMechs => newState.allCopingMechs = copingMechs)
            .then(() => API.getSpecificCopingMech(5))
            .then(greatCopingMechs => newState.greatCopingMechs = greatCopingMechs)
            .then(() => API.getSpecificCopingMech(4))
            .then(goodCopingMechs => newState.goodCopingMechs = goodCopingMechs)
            .then(() => API.getSpecificCopingMech(3))
            .then(okayCopingMechs => newState.okayCopingMechs = okayCopingMechs)
            .then(() => API.getSpecificCopingMech(2))
            .then(notSoGreatCopingMechs => newState.notSoGreatCopingMechs = notSoGreatCopingMechs)
            .then(() => API.getSpecificCopingMech(1))
            .then(badCopingMechs => newState.badCopingMechs = badCopingMechs)
            .then(() => this.setState(newState))
    }

    submitNewCmEntry = () => {
        const newState = {
            allCopingMechs: [],
            addModal: false
        }

        const newObj = {
            userId: this.props.user.id,
            title: this.props.addTitle,
            url: this.props.addUrl,
            info: this.props.addInfo,
            info2: this.props.addInfo2,
            moodCategoryId: parseInt(this.props.addCopingMoodCategoryId),
            score: 0
        }


        API.submitMech(newObj)
            .then(() => API.getAllCopingMechs())
            .then(copingMechs => newState.allCopingMechs = copingMechs)
            .then(() => this.setState(newState))

    }

    render() {
        return (
            <>
                {
                    // Pulls up the "add new coping mech" entry form modal
                    (this.props.moodCategoryId === "" || this.props.moodCategoryId === undefined) ? (<p onClick={this.toggleAddModal} className="add-new-cm"><FiPlus style={{ marginBottom: '4px' }} />  Add</p>) : null
                }
                {
                    // shows all CM's
                    (this.props.moodCategoryId !== "") ? (<p onClick={this.props.showAllCards} className="add-new-cm"><FiGrid style={{ marginBottom: '4px' }} />  View All</p>) : null
                }

                <Carousel widgets={[IndicatorDots]} showArrows={true} >

                    {
                        (this.props.moodCategoryId === 5) ? (
                            this.state.greatCopingMechs.map(copingMech => {
                                return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} copingMechScore={copingMech.score} loadCms={this.loadCms}
                                />
                            })
                        ) :
                            (this.props.moodCategoryId === 4) ? (
                                this.state.goodCopingMechs.map(copingMech => {
                                    return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} copingMechScore={copingMech.score} loadCms={this.loadCms} />
                                })
                            ) :
                                (this.props.moodCategoryId === 3) ? (
                                    this.state.okayCopingMechs.map(copingMech => {
                                        return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} copingMechScore={copingMech.score} loadCms={this.loadCms} />
                                    })
                                ) :
                                    (this.props.moodCategoryId === 2) ? (
                                        this.state.notSoGreatCopingMechs.map(copingMech => {
                                            return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} copingMechScore={copingMech.score} loadCms={this.loadCms} />
                                        })
                                    ) :
                                        (this.props.moodCategoryId === 1) ? (
                                            this.state.badCopingMechs.map(copingMech => {
                                                return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} copingMechScore={copingMech.score} loadCms={this.loadCms} />
                                            })
                                        ) : (this.props.moodCategoryId === "" || this.props.moodCategoryId === undefined) ? (
                                            this.state.allCopingMechs.map(copingMech => {
                                                return <AllCmCard
                                                    key={copingMech.id}
                                                    copingMechId={copingMech.id}
                                                    copingMechUrl={copingMech.url}
                                                    copingMechTitle={copingMech.title}
                                                    copingMechInfo={copingMech.info}
                                                    copingMechInfo2={copingMech.info2}
                                                    copingMechMoodCategory={copingMech.moodCategoryId}
                                                    moodCategoryId={this.props.moodCategoryId}
                                                    handleFieldChange={this.props.handleFieldChange}
                                                    toggleDropdown={this.props.toggleDropdown}
                                                    copingLabel={this.props.copingLabel}
                                                    dropdownOpen={this.props.dropdownOpen}
                                                    editCopingLabel={this.props.editCopingLabel}
                                                    loadCms={this.loadCms}
                                                    copingMechScore={copingMech.score}
                                                    style={{ height: '80%' }} />
                                            })
                                        ) : null
                    }
                </Carousel>
                <Modal size="lg" isOpen={this.state.addModal} toggle={this.toggleAddModal} className={this.props.className} centered={true}>
                    <ModalHeader toggle={this.toggleAddModal}>
                        Add New Coping Mechanism
                        </ModalHeader>
                    <ModalBody>
                        < Form >
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="addTitle" placeholder="Add a title" onChange={this.props.handleFieldChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="info">Description</Label>
                                <Input type="text" name="info" id="addInfo" placeholder="Add a description" onChange={this.props.handleFieldChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="additionalInfo">Additional Information</Label>
                                <Input type="text" name="additionalInfo" id="addInfo2" placeholder="Add any additional information" onChange={this.props.handleFieldChange} />
                            </FormGroup>
                            {/* Replace below with a firebase upload button */}
                            <FormGroup>
                                <Label for="url">Image Url</Label>
                                <Input type="text" name="url" id="addUrl" placeholder="Add a URL" onChange={this.props.handleFieldChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="addCopingMoodCategoryId">Mood Category</Label>
                                <Input type="select" id="addCopingMoodCategoryId" onChange={this.props.handleFieldChange} >
                                    <option></option>
                                    <option value={5}>Great</option>
                                    <option value={4}>Good</option>
                                    <option value={3}>Okay</option>
                                    <option value={2}>Not So Great</option>
                                    <option value={1}>Bad</option>
                                </Input>
                            </FormGroup>
                        </Form >
                    </ModalBody>
                    <div id="cm-add-btn-container" style={{ marginBottom: '20px' }}>
                        <p id="submit-cm-btn" onClick={this.submitNewCmEntry} style={{ marginLeft: '20px' }}><FiCheck />  Submit</p>
                    </div>

                </Modal>
            </>
        )
    }
}