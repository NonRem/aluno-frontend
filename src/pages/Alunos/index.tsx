import moment from "moment";
import React, { useEffect, useState } from "react";
import {Button, Table} from "react-bootstrap"
import api from "../../Services/api"
import {useHistory} from "react-router-dom"
import './index.css'

interface IAluno{
    id: number;
    nome: string;
    ra: string;
    idade: number;
    matriculado: boolean;
    data_de_nascimento: Date;
    endereco: string;
    created_at: Date;
    updated_at: Date;
}

const Alunos: React.FC = () => {

    const history = useHistory()
    const [alunos, setAlunos] = useState<IAluno[]>([])
    
    useEffect(() => {
        loadTasks()
    }, [])
    
    async function loadTasks() {
        const response = await api.get('/aluno')
        console.log(response)
        setAlunos(response.data)
    }

    function newAluno() {
        history.push('/cadastro_alunos')
    }

    async function deleteAluno(id: number) {
        const response = await api.delete(`/aluno/${id}`) 
    }

    async function abrirMatricula(id: number) {
        const response = await api.patch(`/alunoa/${id}`)
    }

    async function encerrarMatricula(id: number) {
        const response = await api.patch(`/alunoe/${id}`)
    }

    function editAluno(id: number){
        history.push(`/cadastro_alunos/${id}`)
    }

    function viewAluno(id: number) {
        history.push(`/ver_aluno/${id}`)
    }

    function formatDate(date : Date){
        return moment(date).format('DD/MM/YYYY')
    }

    return (
        <div className="container">
            <br />
            <div className="aluno-header">
                <h1>Página de Tarefas</h1>
                <Button variant="dark" size="sm" onClick={newAluno}>Novo Aluno</Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Idade</th>
                    <th>Matriculado</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alunos.map(aluno => (
                            <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.ra}</td>
                            <td>{aluno.idade}</td>
                            <td>{aluno.matriculado ? "Matriculado" : "Não Matriculado" }</td>
                            <td>
                                <Button size='sm' variant='primary' onClick={() => editAluno(aluno.id)}>Editar</Button>
                                <Button size='sm' variant='success' disabled={aluno.matriculado} onClick={() => abrirMatricula(aluno.id)}>Matricular</Button>
                                <Button size="sm" variant="warning" disabled={!aluno.matriculado} onClick={() => encerrarMatricula(aluno.id)}>Encerrar</Button>
                                <Button size='sm' variant='secondary' onClick={() => viewAluno(aluno.id)}>Vizualizar</Button>
                                <Button size='sm' variant='danger' onClick={() => deleteAluno(aluno.id)}>Remover</Button>
                            </td>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
        </div>
    );
}


export default Alunos