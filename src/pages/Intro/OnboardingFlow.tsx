import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionsConfig } from "../../config/questionConfig";
import { postUserData } from "../../services/api";
import type { OnboardingResponses } from "../../types/User";
import { useAuth } from "../AuthContext";
import QuestionPage from "./QuestionPage";
const OnboardingFlow: React.FC = () =>
{
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState( 0 );
  const [ answers, setAnswers ] = useState<{ [ key: number ]: string | string[] }>(
    {},
  );
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  useEffect( () =>
  {
    console.log( answers )
    // This useEffect will run whenever 'answers' is updated
    if ( Object.keys( answers ).length === questionsConfig.length )
    {
      postOnBoardingReponses();
    }
  }, [ answers ] );
  const handleNext = ( answer: string | string[] ) =>
  {
    setAnswers( ( prevAnswers ) => ( {
      ...prevAnswers,
      [ questionsConfig[ currentQuestionIndex ].id ]: answer,
    } ) );
    if ( currentQuestionIndex < questionsConfig.length - 1 )
    {
      setCurrentQuestionIndex( ( prevIndex ) => prevIndex + 1 );
    }
  };

  const postOnBoardingReponses = async () =>
  {
    const preferences: OnboardingResponses = {
      eventTypes: answers[ 1 ] as string[],
      eventCategories: answers[ 2 ] as string[],
      departmentAssociation: answers[ 3 ] as string,
      internationalStudent: answers[ 4 ] as string,
      academicLevel: answers[ 5 ] as string,
      major: answers[ 6 ] as string,
      hobbies: answers[ 7 ] as string[],
    };
    console.log( "Preferences:", preferences );
    console.log( user )
    if ( user )
    {
      const updatedUser = { ...user, preferences };
      console.log( updatedUser );
      const userData = await postUserData( updatedUser );
      if ( userData )
      {
        setUser( userData );
        setTimeout( () =>
        {
          navigate( "/events" );
        }, 100 );
      }
    }
  };
  const handleBack = () =>
  {
    if ( currentQuestionIndex > 0 )
    {
      setCurrentQuestionIndex( currentQuestionIndex - 1 );
    }
  };

  const currentQuestion = questionsConfig[ currentQuestionIndex ];

  return (
    <QuestionPage
      questionText={currentQuestion.questionText}
      inputType={currentQuestion.inputType as "checkbox" | "radio"}
      options={currentQuestion.options}
      onNext={handleNext}
      onBack={handleBack}
      isFirstQuestion={currentQuestionIndex === 0}
      imageUrls={currentQuestion.imageUrls} // Add image URLs for the carousel if needed
      answer={answers[ currentQuestion.id ] as string | string[]} // Add initial answer if needed
    />
  );
};

export default OnboardingFlow;
