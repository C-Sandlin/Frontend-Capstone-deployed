import React, { Component } from "react";
import Carousel from 're-carousel'
import IndicatorDots from './indicator-dots'
import GreatCmCard from './GreatCmCard'
import GoodCmCard from './GoodCmCard'
import OkayCmCard from './OkayCmCard'
import NotSoGreatCmCard from './NotSoGreatCmCard'
import BadCmCard from './BadCmCard'
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
        userId: theUserIdIs.id,
    }



    render() {
        return (
            <>
                {
                    // Pulls up the "add new coping mech" entry form modal
                    (this.props.moodCategoryId === "" || this.props.moodCategoryId === undefined) ? (<p onClick={this.props.toggleAddModal} className="add-new-cm"><FiPlus style={{ marginBottom: '4px' }} />  Add</p>) : null
                }
                {
                    // Pulls up the "add new coping mech" entry form modal
                    (this.props.moodCategoryId !== "") ? (<p onClick={this.props.showAllCards} className="add-new-cm"><FiGrid style={{ marginBottom: '4px' }} />  View All</p>) : null
                }

                <Carousel widgets={[IndicatorDots]} showArrows={true} >

                    {
                        (this.props.moodCategoryId === 5) ? (
                            this.props.greatCopingMechs.map(copingMech => {
                                return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} selectedMood={this.props.selectedMood} copingMechScore={copingMech.score} loadCms={this.props.loadCms} />
                            })
                        ) :
                            (this.props.moodCategoryId === 4) ? (
                                this.props.goodCopingMechs.map(copingMech => {
                                    return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} selectedMood={this.props.selectedMood} copingMechScore={copingMech.score} loadCms={this.props.loadCms} />
                                })
                            ) :
                                (this.props.moodCategoryId === 3) ? (
                                    this.props.okayCopingMechs.map(copingMech => {
                                        return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} selectedMood={this.props.selectedMood} copingMechScore={copingMech.score} loadCms={this.props.loadCms} />
                                    })
                                ) :
                                    (this.props.moodCategoryId === 2) ? (
                                        this.props.notSoGreatCopingMechs.map(copingMech => {
                                            return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} selectedMood={this.props.selectedMood} copingMechScore={copingMech.score} loadCms={this.props.loadCms} />
                                        })
                                    ) :
                                        (this.props.moodCategoryId === 1) ? (
                                            this.props.badCopingMechs.map(copingMech => {
                                                return <GenericCmCard key={copingMech.id} copingMechId={copingMech.id} copingMechUrl={copingMech.url} copingMechTitle={copingMech.title} copingMechInfo={copingMech.info} copingMechInfo2={copingMech.info2} selectedMood={this.props.selectedMood} copingMechScore={copingMech.score} loadCms={this.props.loadCms} />
                                            })
                                        ) : (this.props.moodCategoryId === "" || this.props.moodCategoryId === undefined) ? (
                                            this.props.allCopingMechs.map(copingMech => {
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
                                                    loadCms={this.props.loadCms}
                                                    copingMechScore={copingMech.score} />
                                            })
                                        ) : null
                    }
                </Carousel>
                <Modal size="lg" isOpen={this.props.addModal} toggle={this.toggleAddModal} className={this.props.className} centered={true}>
                    <ModalHeader toggle={this.props.toggleAddModal}>
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
                    <div id="cm-btn-container" style={{ marginBottom: '20px' }}>
                        <p id="submit-cm-btn" onClick={this.props.submitNewCmEntry} style={{ marginLeft: '20px' }}><FiCheck />  Submit</p>
                    </div>

                </Modal>
            </>
        )
    }
}