import React from 'react';
import {Trans, translate} from 'react-i18next';
import {
    Button,
    Card,
    CardBody,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';

import Select from 'react-select'
import 'react-select/dist/react-select.css';
import classnames from 'classnames';

import ContentWrapper from "../Layout/ContentWrapper";


const MARITAL_STATUSES = [
    {value: 'single', label: 'Solteiro(a)',},
    {value: 'married', label: 'Casado(a)',},
    {value: 'divorced', label: 'Divorciado(a)',},
    {value: 'widow', label: 'Viuvo(a)',},
]

const DOCUMENT_TYPES = [
    {value: 'ID', label: 'Bilhete de Identidade (BI)'},
    {value: 'PASSPORT', label: 'Passaporte'},
]

class CreatePatient extends React.Component {

    state = {
        dropdownOpen: false,
        maritalStatus: '',
        activeTab: '1',
        name: '',
        surname: '',
        birthDate: '',
        gender: '',
        locality: '',
        street: '',
        block: '',
        neighborhood: '',
        houseNumber: '',
        cell: '',
        identificationType: '',
        identificationNumber: '',
        identificationIssueDate: '',
        identificationExpiryDate: '',
        contactPersonName: '',
        contactPersonSurname: '',
        contactPersonPhone: '',
        contactPersonAddress: '',
        contactPersonWorkPlace: ''

    }

    componentDidMount() {
    }

    close = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleMaritalStatusChange = (selectedOption) => {
        this.setState({maritalStatus: selectedOption})
    }

    handleDocumentTypeChange = (selectedOption) => {
        this.setState({identificationType: selectedOption})
    }

    handleInputChange(event, inputKey) {
        this.setState({[inputKey]: event.target.value})
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onSubmit = (e) => {
        console.log('Form Submitted');
        fetch("http://localhost:8500/emr_core/patients/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "person": {
                    "identification_documents": [
                        {
                            "type": this.state.identificationType.value,
                            "number": this.state.identificationNumber,
                            "expiry_date": this.state.identificationExpiryDate,
                            "issue_date": this.state.identificationIssueDate
                        }
                    ],
                    "addresses": [
                        {
                            "neighborhood": this.state.neighborhood,
                            "street": this.state.street,
                            "house_number": this.state.houseNumber,
                            "cell": this.state.cell,
                            "block": this.state.block,
                            "locality": 1
                        }
                    ],
                    "name": this.state.name,
                    "surname": this.state.surname,
                    "age": 20,
                    "date_of_birth": this.state.birthDate,
                    "gender": 'M'
                },
                "identifier": "1234",
                "registration_date": '2018-08-20 10:00:00'
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res)
            })


        e.preventDefault();
    }


    render() {
        const {maritalStatus, identificationType} = this.state;
        const maritalStatusValue = maritalStatus && maritalStatus.value;
        const documentTypeValue = identificationType && identificationType.value;

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div><Trans i18nKey='emr.patient.NEW_PATIENT'></Trans></div>
                    {/* START Language list */}
                    <div className="ml-auto">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle>
                                Ingles
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-right-forced animated fadeInUpShort">
                                <DropdownItem onClick={() => this.changeLanguage('en')}>Ingles</DropdownItem>
                                <DropdownItem onClick={() => this.changeLanguage('pt')}>Portugues</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {/* END Language list */}
                </div>
                <Card className="card-default">

                    <CardBody>
                        <form onSubmit={this.onSubmit}>
                            <fieldset>
                                <legend>Dados pessoais</legend>
                                <Row>
                                    <Col lg={3}>
                                        <FormGroup>
                                            <label>Nome</label>
                                            <Input type="text" value={this.state.name}
                                                   onChange={(e) => this.handleInputChange(e, 'name')}/>
                                        </FormGroup>
                                        <br/>
                                        <FormGroup>
                                            <label>Data de Nascimento</label>
                                            <Input type="date" value={this.state.birthDate}
                                                   onChange={(e) => this.handleInputChange(e, 'birthDate')}/>
                                        </FormGroup>
                                        <br/>
                                        <FormGroup>
                                            <label>Genero</label>
                                            <div>
                                                <FormGroup check inline>
                                                    <Label check>
                                                        <Input type="radio" name="inlineradio"/> Masculino
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Label check>
                                                        <Input type="radio" name="inlineradio"/> Femenino
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                        </FormGroup>
                                        <br/>
                                        <FormGroup>
                                            <label>Estado Civil</label>
                                            <Select
                                                name="select-marital-status"
                                                value={maritalStatusValue}
                                                onChange={this.handleMaritalStatusChange}
                                                options={MARITAL_STATUSES}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={3}>
                                        <FormGroup>
                                            <label>Apelido</label>
                                            <Input type="text" value={this.state.surname}
                                                   onChange={(e) => this.handleInputChange(e, 'surname')}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </fieldset>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === '1'})}
                                        onClick={() => {
                                            this.toggleTab('1');
                                        }}
                                    >
                                        Endereco
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === '2'})}
                                        onClick={() => {
                                            this.toggleTab('2');
                                        }}
                                    >
                                        Identificacao
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: this.state.activeTab === '3'})}
                                        onClick={() => {
                                            this.toggleTab('3');
                                        }}
                                    >
                                        Pessoa de Referencia
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Provincia</label>
                                                <Select
                                                    name="select-marital-status"
                                                    value={maritalStatusValue}
                                                    onChange={this.handleMaritalStatusChange}
                                                    options={MARITAL_STATUSES}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Distrito</label>
                                                <Select
                                                    name="select-marital-status"
                                                    value={maritalStatusValue}
                                                    onChange={this.handleMaritalStatusChange}
                                                    options={MARITAL_STATUSES}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Posto Administrativo</label>
                                                <Select
                                                    name="select-marital-status"
                                                    value={maritalStatusValue}
                                                    onChange={this.handleMaritalStatusChange}
                                                    options={MARITAL_STATUSES}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Localidade</label>
                                                <Select
                                                    name="select-marital-status"
                                                    value={maritalStatusValue}
                                                    onChange={this.handleMaritalStatusChange}
                                                    options={MARITAL_STATUSES}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={3}>
                                            <FormGroup>
                                                <label>Av./Rua</label>
                                                <Input type="text" value={this.state.street}
                                                       onChange={(e) => this.handleInputChange(e, 'street')}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Numero da Casa</label>
                                                <Input type="text" value={this.state.houseNumber}
                                                       onChange={(e) => this.handleInputChange(e, 'houseNumber')}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Celula</label>
                                                <Input type="text" value={this.state.cell}
                                                       onChange={(e) => this.handleInputChange(e, 'cell')}/>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={3}>
                                            <FormGroup>
                                                <label>Bairro</label>
                                                <Input type="text" value={this.state.neighborhood}
                                                       onChange={(e) => this.handleInputChange(e, 'neighborhood')}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Quarteirao</label>
                                                <Input type="text" value={this.state.block}
                                                       onChange={(e) => this.handleInputChange(e, 'block')}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Tipo de Documento</label>
                                                <Select
                                                    name="select-document-type"
                                                    value={documentTypeValue}
                                                    onChange={this.handleDocumentTypeChange}
                                                    options={DOCUMENT_TYPES}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Numero</label>
                                                <Input type="text" value={this.state.identificationNumber}
                                                       onChange={(e) => this.handleInputChange(e, 'identificationNumber')}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3}>
                                            <FormGroup>
                                                <label>Data de Emissao</label>
                                                <Input type="date" value={this.state.identificationIssueDate}
                                                       onChange={(e) => this.handleInputChange(e, 'identificationIssueDate')}/>
                                            </FormGroup>

                                        </Col>
                                        <Col lg={3}>
                                            <FormGroup>
                                                <label>Validade</label>
                                                <Input type="date" value={this.state.identificationExpiryDate}
                                                       onChange={(e) => this.handleInputChange(e, 'identificationExpiryDate')}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="3">
                                    <Row>
                                        <Col lg={12}>
                                            <Row>
                                                <Col lg={3}>
                                                    <FormGroup>
                                                        <label>Nome</label>
                                                        <Input type="text" value={this.state.contactPersonName}
                                                               onChange={(e) => this.handleInputChange(e, 'contactPersonName')}/>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={3}>
                                                    <FormGroup>
                                                        <label>Apelido</label>
                                                        <Input type="text" value={this.state.contactPersonSurname}
                                                               onChange={(e) => this.handleInputChange(e, 'contactPersonSurname')}/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Morada</label>
                                                <Input type="text" value={this.state.contactPersonAddress}
                                                       onChange={(e) => this.handleInputChange(e, 'contactPersonAddress')}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Telefone</label>
                                                <Input type="text" value={this.state.contactPersonPhone}
                                                       onChange={(e) => this.handleInputChange(e, 'contactPersonPhone')}/>
                                            </FormGroup><FormGroup>
                                            <label>Local de Trabalho</label>
                                            <Input type="text" value={this.state.contactPersonWorkPlace}
                                                   onChange={(e) => this.handleInputChange(e, 'contactPersonWorkPlace')}/>
                                        </FormGroup>

                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                            <br/>
                            <Button color="primary" size="md" type="submit">Submit</Button>
                        </form>
                    </CardBody>
                </Card>
            </ContentWrapper>
        );
    }
}

export default translate('translations')(CreatePatient);
