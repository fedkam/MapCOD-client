import React from "react";
import { ServiceConsumer } from "../service-context";

const withService = () => Wrapped => {
  return props => {
    return (
      <ServiceConsumer>
        {dataService => {
          return <Wrapped {...props} dataService={dataService} />;
        }}
      </ServiceConsumer>
    );
  };
};

export default withService;
