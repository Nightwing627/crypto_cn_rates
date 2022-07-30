import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import All from './Component/All';
import Cad from './Component/Cad';
import Eur from './Component/Eur';
import Aed from './Component/Aed';
import Inr from './Component/Inr';
import Pkr from './Component/Pkr';

// export default (
export default class Component extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={All} />
                    <Route path="/cad" component={Cad} />
                    <Route path="/eur" component={Eur} />
                    <Route path="/aed" component={Aed} />
                    <Route path="/inr" component={Inr} />
                    <Route path="/pkr" component={Pkr} />
                </Switch>
            </BrowserRouter>
        )
    }
}