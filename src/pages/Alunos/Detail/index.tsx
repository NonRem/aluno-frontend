import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../Services/api';

interface IAluno {
    id: number;
    nome: string;
    ra: string;
    idade: number;
    data_de_nascimento: Date;
    endereco: string;
    matriculado: boolean;
    created_at: Date;
    updated_at: Date;
}

const Detail: React.FC = () => {

    const history = useHistory()
    const data = new Date("2000-01-01T00:00:00Z")
    const {id} = useParams<{id: string}>()

    const [aluno, setAluno] = useState<IAluno>({
        id: 0,
        nome: '',
        ra: '',
        idade: 0,
        data_de_nascimento: data,
        endereco: '',
        matriculado: false,
        created_at: data,
        updated_at: data
    })

    useEffect(() => {
        findAluno()
    })

    async function findAluno() {
        const response = await api.get(`/aluno/${id}`)
        setAluno(response.data)
    }

    function back(){
        history.goBack()
    }

    function formatDate(date: Date) {
        return moment(date).format('DD/MM/YYYY')
    }

    return (
        <div className="container">
            <br />
            <div className="aluno-header">
                <h1>Detalhes do Aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />

            <Card>
                <Card.Body>
                    <Card.Title>{aluno?.nome}</Card.Title>

                    <Card.Text>
                        <strong>RA: </strong>
                        {aluno?.ra}
                        <br />
                        <strong>Idade: </strong>
                        {aluno?.idade}
                        <br />
                        <strong>Data de nascimento: </strong>
                        {formatDate(aluno?.data_de_nascimento)}
                        <br />
                        <strong>Status: </strong>
                        {aluno?.matriculado ? "Matriculado" : "Não matriculado"}
                        <br />
                        <strong>Endereço: </strong>
                        {aluno?.endereco}
                        <br />
                        <strong>Criado em: </strong>
                        {formatDate(aluno?.created_at)}
                        <br />
                        <strong>Atualizado em: </strong>
                        {formatDate(aluno?.updated_at)}
                        <br />
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )

}

export default Detail