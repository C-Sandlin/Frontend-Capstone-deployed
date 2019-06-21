{/* <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                        className="dropdown-container"
                        style={{ marginTop: '20vh' }}
                    >
                        <DropdownToggle className="regulate-dropdown" style={{ display: 'flex', color: "#4F6D74", flexDirection: 'row', backgroundColor: 'transparent', padding: '10px', width: '50%', justifySelf: 'center', margin: 'auto', marginTop: '30px', border: '1px solid #4F6D74' }}>
                            <div className="button-container">
                                <div style={{ justifySelf: 'flex-start' }}>
                                    <p style={{ fontFamily: 'Montserrat', marginTop: '7px', marginLeft: '8px' }}>{this.state.label}</p>
                                </div>
                                <IconContext.Provider value={{ size: "2.2em" }}>
                                    <FiChevronDown style={{ color: "#2A404A", marginLeft: '20px' }} />
                                </IconContext.Provider>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu
                            className="dropdown-actual"
                            right={true}
                            // style={{ backgroundColor: '#CCE4DE', border: 'none', marginLeft: '25%', maxHeight: '100' }}
                            onChange={(e) => this.setState({ selectedMood: e.target.value })}
                            modifiers={{
                                setMaxHeight: {
                                    enabled: true,
                                    order: 890,
                                    fn: (data) => {
                                        return {
                                            ...data,
                                            styles: {
                                                ...data.styles,
                                                overflow: 'auto',
                                                maxHeight: 300,
                                                backgroundColor: '#9AC4BB',
                                                border: 'none',
                                                marginLeft: '23%',
                                                borderRadius: 'none',
                                                width: '50%',
                                                fontFamily: 'Montserrat'
                                            },
                                        };
                                    },
                                },
                            }}>
                            <DropdownItem header>Great</DropdownItem>
                            {
                                (this.props.greatMoods) ? (this.props.greatMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={this.select} style={{ fontFamily: 'Montserrat', marginTop: '7px', marginLeft: '8px' }}>{mood.name}</DropdownItem>
                                })) : null
                            }
                            <DropdownItem divider />
                            <DropdownItem header>Good</DropdownItem>
                            {
                                (this.props.goodMoods) ? (this.props.goodMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={this.select} style={{ fontFamily: 'Montserrat', marginTop: '7px', marginLeft: '8px' }}>{mood.name}</DropdownItem>
                                })) : null
                            }
                            <DropdownItem divider />
                            <DropdownItem header>Okay</DropdownItem>
                            {
                                (this.props.okayMoods) ? (this.props.okayMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={this.select} style={{ fontFamily: 'Montserrat', marginTop: '7px', marginLeft: '8px' }}>{mood.name}</DropdownItem>
                                })) : null
                            }
                            <DropdownItem divider />
                            <DropdownItem header>Not So Great</DropdownItem>
                            {
                                (this.props.notSoGreatMoods) ? (this.props.notSoGreatMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={this.select} style={{ fontFamily: 'Montserrat', marginTop: '7px', marginLeft: '8px' }}>{mood.name}</DropdownItem>
                                })) : null
                            }
                            <DropdownItem divider />
                            <DropdownItem header>Bad</DropdownItem>
                            {
                                (this.props.badMoods) ? (this.props.badMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={this.select} style={{ fontFamily: 'Montserrat', marginTop: '7px', marginLeft: '8px' }}>{mood.name}</DropdownItem>
                                })) : null
                            }
                        </DropdownMenu>
                    </Dropdown> */}