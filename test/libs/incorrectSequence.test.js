import expect from 'expect';
import Question from '../../src/libs/question';

const data = {
  prompt: 'Combine the following sentences into one sentence.',
  sentences: ['Jared likes Edtech. Jared likes startups.'],
  responses: [
    {
      text: 'Jared likes Edtech and startups.',
      feedback: "Excellent, that's correct!",
      optimal: true,
    },
    {
      text: 'Jared likes startups and Edtech.',
      feedback: "Excellent, that's correct!",
      optimal: true,
    }
  ],
  incorrectSequences: [
    {
      text: 'early stage companies|||high potential companies',
      feedback: 'Inc 1',
    },
    {
      text: 'because|||however',
      feedback: 'Inc 2',
    },
    {
      text: 'triangle ',
      feedback: 'Inc 3',
    }
  ],
};

describe('The Jared question object', () => {
  const question = new Question(data);

  const negativeTests = [
    'Jared likes Edtech and startups.',
    'Jared likes startups and Edtech.',
    'Jared likes startups as well as Edtech.',
    'Jared likes startups as well as Edtech.'
  ];

  const positiveTests = [
    'Jared likes early stage companies.',
    'Jared likes high potential companies.',
    'Jared likes Edtech because he likes startups.',
    'Jared likes Edtech and Edtech and triangle too.'
  ];

  positiveTests.forEach((test, i) => {
    it(`should find a incorrect sequence match: ${i}`, () => {
      expect(
        question.checkIncorrectSequenceMatch(test)
      ).toExist();
    });
  });

  negativeTests.forEach((test, i) => {
    it(`should not find a incorrect sequence match: ${i}`, () => {
      expect(
        question.checkIncorrectSequenceMatch(test)
      ).toNotExist();
    });
  });
});
