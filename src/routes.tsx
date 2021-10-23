import React from "react";
import {Switch, Route} from "react-router-dom"

import Home from "./pages/Home"
import Alunos from "./pages/Alunos"
import AlunosForm from "./pages/Alunos/Form";
import Detail from "./pages/Alunos/Detail"

const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/alunos" exact component={Alunos} />
            <Route path="/cadastro_alunos" exact component={AlunosForm} />
            <Route path="/cadastro_alunos/:id" exact component={AlunosForm}/>
            <Route path="/ver_aluno/:id" exact component={Detail}/>
        </Switch>
    )
}

export default Routes