import React, { useReducer, useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import OtpComponent from "./common/OtpComponent";
import CreateEventForm from "./forms/Event/CreateEventForm";
import CreatePaymentForm from "./forms/Event/CreatePaymentForm";
import CreateTicketsForm from "./forms/Event/CreateTicketsForm";
import AlertModal from "./common/AlertModal";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function FormStepper() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState({
    activeStep: 0,
    isLastStep: false,
    isFirstStep: true,
  });

  const [organizerPaymentIds, setOrganizerPaymentIds] = useState([]);
  const [eventFormData, setEventFormData] = useState({
    name: "",
    contact: "",
    location: "",
    description: "",
    eventStartDate: "",
    eventEndDate: "",
    ticketOpenDate: "",
    ticketCloseDate: "",
    thumbnail: [],
  });
  const [ticketTypesData, setTicketTypesData] = useState([]);

  const handleStepClick = (direction) => {
    const isAnyFieldEmpty = Object.values(eventFormData).some(
      (value) => value === "" || (Array.isArray(value) && value.length === 0)
    );

    // if (isAnyFieldEmpty) {
    //   toast.error("Event Data Cannot be Black !!");
    //   return;
    // }

    // if (
    //   direction === "next" &&
    //   ticketTypesData.length === 0 &&
    //   currentStep.activeStep === 1
    // ) {
    //   toast.error("Put a minimum of 1 ticket type!");
    //   return;
    // }

    setCurrentStep((prevStep) => {
      const newStep = { ...prevStep };

      newStep.activeStep =
        direction === "next" ? newStep.activeStep + 1 : newStep.activeStep - 1;
      newStep.isLastStep = newStep.activeStep === 2;
      newStep.isFirstStep = newStep.activeStep === 0;

      return newStep;
    });
  };

  return (
    <div className="w-full py-[80px] px-8">
      <Stepper
        lineClassName="bg-black/50"
        activeStep={currentStep.activeStep}
        isLastStep={currentStep.isLastStep}
        isFirstStep={currentStep.isFirstStep}
      >
        <Step>1</Step>
        <Step>2</Step>
        <Step>3</Step>
      </Stepper>

      <div className="h-auto ">
        {currentStep.activeStep === 0 && (
          <CreateEventForm
            eventFormData={eventFormData}
            setEventFormData={setEventFormData}
          />
        )}
        {currentStep.activeStep === 1 && (
          <CreateTicketsForm
            ticketTypesData={ticketTypesData}
            setTicketTypesData={setTicketTypesData}
          />
        )}
        {currentStep.activeStep === 2 && (
          <CreatePaymentForm setOrganizerPaymentIds={setOrganizerPaymentIds} />
        )}
      </div>

      <div className="mt-16 flex justify-between">
        <Button
          onClick={() => handleStepClick("prev")}
          disabled={currentStep.isFirstStep}
        >
          Prev
        </Button>
        <Button
          onClick={() => handleStepClick("next")}
          disabled={currentStep.isLastStep}
        >
          Next
        </Button>
      </div>

      <AnimatePresence>{/* Your Modal Code */}</AnimatePresence>
    </div>
  );
}
