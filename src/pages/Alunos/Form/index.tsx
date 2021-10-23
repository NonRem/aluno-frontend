import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../Services/api"

interface IAluno {
    nome: string;
    ra: string;
    idade: number;
    endereco: string;
    data_de_nascimento: Date;
}

const AlunosForm: React.FC = () => {
    
    const data = new Date("2000-01-01T00:00:00Z")
    const history = useHistory()
    const {id} = useParams<{id: string}>()
    
    const [model, setModel] = useState<IAluno>({
        nome: "",
        ra: "",
        idade: 0,
        endereco: "",
        data_de_nascimento: data
    })

    useEffect(() => {
        console.log(id)
        if(id != undefined){
            findAluno(id)
        }
    })

    async function findAluno(id: string){
        const response = await api.get(`/aluno/${id}`)
        console.log(response)
        setModel({
            nome: response.data.nome,
            ra: response.data.ra,
            idade: response.data.idade,
            endereco: response.data.endereco,
            data_de_nascimento: response.data.data_de_nascimento
        })
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>){
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        console.log(model)

        if(id != undefined){
            const response = await api.put(`/aluno/${id}`, model)
        }
        else {
            const response = await api.post('/aluno', model)
        }

        back()
    }

    function back(){
        history.goBack()
    }

    return (

        <div className="container">
            <br />
            <div className="aluno-header">
                <h1>Novo Aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome do Aluno</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={model.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>RA</Form.Label>
                        <Form.Control
                            type="text"
                            name="ra"
                            value={model.ra}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Idade</Form.Label>
                        <Form.Control 
                            type="text"
                            name="idade"
                            value={model.idade}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control 
                            type="date"
                            name="idade"
                            value={model.idade}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={3}
                            name="endereco"
                            value={model.endereco}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <br />
                    <Button variant="dark" size="sm" type="submit">Salvar</Button>

                </Form>
            </div>
        </div>

    )

} 

export default AlunosForm