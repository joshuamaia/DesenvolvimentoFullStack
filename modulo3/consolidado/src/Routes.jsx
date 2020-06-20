import React from "react";
import { Switch, Route } from "react-router-dom";
import InputFullSalary from "./salario/InputFullSalary";
import Form from "./juros/Form";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={InputFullSalary} />
      <Route path="/juros" component={Form} />
    </Switch>
  );
}
