import
{
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface QuestionPageProps
{
  questionText: string;
  inputType: "checkbox" | "radio";
  options: string[];
  onNext: ( answer: string | string[] ) => void;
  onBack: () => void;
  isFirstQuestion: boolean;
  imageUrls: string[]; // Add an array of image URLs for the carousel
  answer: string | string[]
}

const QuestionPage: React.FC<QuestionPageProps> = ( {
  questionText,
  inputType,
  options,
  onNext,
  onBack,
  isFirstQuestion,
  imageUrls,
  answer
} ) =>
{
  const [ selectedAnswer, setSelectedAnswer ] = useState<string | string[]>(
    inputType === "checkbox" ? [] : ""
  );
  const [ currentImageIndex, setCurrentImageIndex ] = useState( 0 );
  useEffect( () =>
  {
    // Reset selectedAnswer based on inputType
    setSelectedAnswer( inputType === "checkbox" ? [] : "" );
  }, [ inputType ] );
  // Auto-change carousel image
  useEffect( () =>
  {
    const interval = setInterval( () =>
    {
      setCurrentImageIndex( ( prevIndex ) => ( prevIndex + 1 ) % imageUrls.length );
    }, 3000 ); // Change image every 3 seconds
    return () => clearInterval( interval );
  }, [ imageUrls ] );

  useEffect( () =>
  {
    if ( answer )
    {
      setSelectedAnswer( answer );
    }
  }, [ answer ] );

  const handleCheckboxChange = ( option: string ) =>
  {
    console.log( inputType )
    console.log( Array.isArray( selectedAnswer ) )
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
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left Column: Question and Options */}
      <div className="text-left">
        <Typography variant="h4" className="text-2xl font-bold mb-8">
          {questionText}
        </Typography>
        <br />
        <FormControl component="fieldset" className="space-y-4">
          {inputType === "checkbox" &&
            options.map( ( option ) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={
                      Array.isArray( selectedAnswer ) &&
                      selectedAnswer.includes( option )
                    }
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
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={<span className="text-lg">{option}</span>}
                />
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
            disabled={
              inputType === "checkbox"
                ? ( selectedAnswer as string[] ).length === 0
                : !selectedAnswer
            }
          >
            Next
          </Button>
        </div>
      </div>

      {/* Right Column: Image Carousel */}
      <div className="relative w-full h-64 md:h-80">
        <img
          src={imageUrls[ currentImageIndex ]}
          alt={`Carousel ${ currentImageIndex + 1 }`}
          className="w-full h-full object-cover rounded-lg shadow-md"
          style={{
            width: '600px', // Fixed width for the image
            height: '400px', // Fixed height for the image
            objectFit: 'cover', // Ensures image scales proportionally to fill the area
            margin: '0 auto', // Center the image horizontally
          }}
        />
      </div>
    </div>
  );
};

export default QuestionPage;
