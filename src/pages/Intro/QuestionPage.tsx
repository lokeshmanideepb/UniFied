import React, { useState } from "react";
import { Typography, Button, FormControl, FormControlLabel, Checkbox, Radio, RadioGroup } from "@mui/material";

interface QuestionPageProps
{
    questionText: string;
    inputType: "checkbox" | "radio";
    options: string[];
    onNext: ( answer: string | string[] ) => void;
    onBack: () => void;
    isFirstQuestion: boolean;

}

const QuestionPage: React.FC<QuestionPageProps> = ( { questionText, inputType, options, onNext, onBack, isFirstQuestion } ) =>
{
    const [ selectedAnswer, setSelectedAnswer ] = useState<string | string[]>( inputType === "checkbox" ? [] : "" );

    const handleCheckboxChange = ( option: string ) =>
    {
        if ( Array.isArray( selectedAnswer ) )
        {
            setSelectedAnswer(
                selectedAnswer.includes( option )
                    ? selectedAnswer.filter( ( item ) => item !== option )
                    : [ ...selectedAnswer, option ]
            );
        }
    };

    const handleRadioChange = ( event: React.ChangeEvent<HTMLInputElement> ) =>
    {
        setSelectedAnswer( event.target.value );
    };

    const handleSubmit = () =>
    {
        console.log( selectedAnswer )
        onNext( selectedAnswer );
        if ( inputType === "checkbox" )
        {
            setSelectedAnswer( [] );
        } else
        {
            setSelectedAnswer( "" );
        }
    };

    return (
        <div className="p-5 text-left flex flex-col">
            <Typography variant="h4" className="text-2xl font-bold mb-8">{questionText}</Typography>
            <FormControl component="fieldset" className="mt-4 space-y-4">
                {inputType === "checkbox" &&
                    options.map( ( option ) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={Array.isArray( selectedAnswer ) && selectedAnswer.includes( option )}
                                    onChange={() => handleCheckboxChange( option )}
                                    className="mr-2"
                                />
                            }
                            label={<span className="text-lg">{option}</span>}
                        />
                    ) )}
                {inputType === "radio" && (
                    <RadioGroup value={selectedAnswer} onChange={handleRadioChange}>
                        {options.map( ( option ) => (
                            <FormControlLabel key={option} value={option} control={<Radio />} label={<span className="text-lg">{option}</span>} />
                        ) )}
                    </RadioGroup>
                )}
            </FormControl>
            <div className="mt-12 flex space-x-4">
                {!isFirstQuestion && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onBack}
                        className="w-20 bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400"
                    >
                        Back
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className="w-20 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                    disabled={inputType === "checkbox" ? ( selectedAnswer as string[] ).length === 0 : !selectedAnswer}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default QuestionPage;
