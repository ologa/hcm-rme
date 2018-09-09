import React from 'react';
import {Trans, translate} from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table
} from 'reactstrap';

import PropTypes from 'prop-types';

class PatientList extends React.Component {
    state = {
        dropdownOpen: false,
        patients: [],
        showCreatePatientModal: false
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    componentDidMount() {
        fetch("http://localhost:8500/emr_core/patients/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(patients => {
                console.log(patients)
                console.log('patientes')
                this.setState({patients: patients})
            })
    }

    openCreatePatientModal = () => {
       this.context.router.history.push('/patient/new');
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div><Trans i18nKey='emr.patient.PATIENT_LIST'></Trans></div>
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
                <Row>
                    <Col lg={12}>
                        <Card className="card-default">
                            <CardHeader><Trans i18nKey='emr.patient.PATIENTS'/></CardHeader>

                            <CardBody>
                                <Button color="primary" onClick={this.openCreatePatientModal}><Trans i18nKey='emr.patient.NEW_PATIENT'/></Button>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th><strong><Trans i18nKey='emr.patient.PID'/></strong></th>
                                        <th><strong><Trans i18nKey='emr.patient.NAME'/></strong></th>
                                        <th><strong><Trans i18nKey='emr.patient.AGE'/></strong></th>
                                        <th><strong><Trans i18nKey='emr.patient.GENDER'/></strong></th>
                                        <th><strong><Trans i18nKey='emr.patient.REGISTRATION_DATE'/></strong></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.patients.map(patient => (
                                        <tr key={patient.identifier}>
                                            <td>{patient.identifier}</td>
                                            <td>{patient.person.name + ' ' + patient.person.surname}</td>
                                            <td>{patient.person.age}</td>
                                            <td>{patient.person.gender}</td>
                                            <td>{patient.registration_date}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}

PatientList.contextTypes = {
    router: PropTypes.object.isRequired
}

export default translate('translations')(PatientList);
