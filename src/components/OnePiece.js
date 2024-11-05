import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const PageContainer = styled.div`
  background: linear-gradient(45deg, #0077be, #00a8e8);
  min-height: 100vh;
  padding: 20px;
  color: #fff;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${waveAnimation} 2s ease-in-out infinite;
`;

const Section = styled.section`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #ff9900;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px;

  &:hover {
    background-color: #ffad33;
    transform: scale(1.05);
  }
`;

const QuizContainer = styled.div`
  margin-top: 20px;
`;

const OnePiece = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('');

  const questions = {
    easy: [
      {
        question: "Хто є капітаном піратів Солом'яного капелюха?",
        options: ["Зоро", "Луффі", "Намі", "Санджі"],
        correctAnswer: 1
      },
      {
        question: "Як називається перший корабель команди Солом'яного капелюха?",
        options: ["Гоїнг Меррі", "Таузенд Санні", "Ред Форс", "Моубі Дік"],
        correctAnswer: 0
      },
      {
        question: "Який фрукт з'їв Чоппер?",
        options: ["Гому-Гому но Мі", "Хіто-Хіто но Мі", "Мера-Мера но Мі", "Юмі-Юмі но Мі"],
        correctAnswer: 1
      },
      {
        question: "Хто є коком на кораблі Солом'яного капелюха?",
        options: ["Зоро", "Усопп", "Санджі", "Френкі"],
        correctAnswer: 2
      },
      {
        question: "Яка мрія Луффі?",
        options: ["Знайти Ван Піс", "Стати найсильнішим мечником", "Намалювати карту світу", "Знайти Олл Блю"],
        correctAnswer: 0
      }
    ],
    medium: [
      {
        question: "Яка назва фрукту диявола Луффі?",
        options: ["Гому-Гому но Мі", "Мера-Мера но Мі", "Хана-Хана но Мі", "Сору-Сору но Мі"],
        correctAnswer: 0
      },
      {
        question: "Хто є батьком Луффі?",
        options: ["Гол Д. Роджер", "Едвард Ньюгейт", "Монкі Д. Драгон", "Шанкс"],
        correctAnswer: 2
      },
      {
        question: "Яка нагорода за голову Луффі після арки Дресс Роза?",
        options: ["300,000,000 белі", "400,000,000 белі", "500,000,000 белі", "600,000,000 белі"],
        correctAnswer: 2
      },
      {
        question: "Хто є першим помічником Луффі?",
        options: ["Намі", "Зоро", "Санджі", "Усопп"],
        correctAnswer: 1
      },
      {
        question: "Яка назва організації, до якої належить батько Луффі?",
        options: ["Морський дозор", "Революційна армія", "Світовий уряд", "Сім воєнних лордів моря"],
        correctAnswer: 1
      },
      {
        question: "Яка назва села, де народився Луффі?",
        options: ["Логтаун", "Фуша", "Кокояші", "Шібукай"],
        correctAnswer: 1
      },
      {
        question: "Хто навчив Луффі користуватися Хакі?",
        options: ["Шанкс", "Сільверс Рейлі", "Монкі Д. Гарп", "Портгас Д. Ейс"],
        correctAnswer: 1
      },
      {
        question: "Яка назва техніки Луффі, коли він надуває своє тіло?",
        options: ["Гому Гому но Балон", "Гому Гому но Фусен", "Гому Гому но Гігант", "Гому Гому но Джет"],
        correctAnswer: 1
      },
      {
        question: "Хто дав Луффі його солом'яний капелюх?",
        options: ["Гол Д. Роджер", "Шанкс", "Портгас Д. Ейс", "Монкі Д. Гарп"],
        correctAnswer: 1
      },
      {
        question: "Яке прізвисько у Луффі?",
        options: ["Пірат-клоун", "Солом'яний капелюх", "Вогняний кулак", "Чорна борода"],
        correctAnswer: 1
      }
    ],
    hard: [
      {
        question: "Хто є автором книги 'Брехня Норланда'?",
        options: ["Монблан Норланд", "Монблан Крикет", "Ніко Робін", "Гол Д. Роджер"],
        correctAnswer: 0
      },
      {
        question: "Яка справжня назва острова Скайпія?",
        options: ["Джая", "Ураношіма", "Шандора", "Біркан"],
        correctAnswer: 2
      },
      {
        question: "Хто створив Понегліфи?",
        options: ["Клан Козукі", "Народ D.", "Жителі Скайпії", "Риболюди"],
        correctAnswer: 0
      },
      {
        question: "Яке справжнє ім'я Гол Д. Роджера?",
        options: ["Гол Д. Роджер", "Джой Бой", "Рокс Д. Ксебек", "Едвард Ньюгейт"],
        correctAnswer: 0
      },
      {
        question: "Хто є творцем зброї Плутон?",
        options: ["Вегапанк", "Том", "Клан Козукі", "Древнє Королівство"],
        correctAnswer: 2
      },
      {
        question: "Яка назва техніки Зоро, яка створює ілюзію дев'яти мечів?",
        options: ["Санторю", "Асура", "Шіші Сонсон", "Оні Гірі"],
        correctAnswer: 1
      },
      {
        question: "Хто є лідером організації CP0?",
        options: ["Роб Луччі", "Спандам", "Баггі", "Невідомо"],
        correctAnswer: 3
      },
      {
        question: "Яка назва найсильнішої техніки Гекко Морії?",
        options: ["Кагеро", "Цуйто", "Дорі Дорі но Мі", "Шедоу Асбург"],
        correctAnswer: 3
      },
      {
        question: "Яке справжнє ім'я Сільверса Рейлі?",
        options: ["Темний Король", "Правиця Короля Піратів", "Рейлі Д. Сільверс", "Невідомо"],
        correctAnswer: 1
      },
      {
        question: "Хто є батьком Портгаса Д. Ейса?",
        options: ["Гол Д. Роджер", "Монкі Д. Драгон", "Едвард Ньюгейт", "Шанкс"],
        correctAnswer: 0
      },
      {
        question: "Яка назва техніки Дофламінго, яка дозволяє йому літати?",
        options: ["Овечі Хмари", "Небесна Дорога", "Місячна Хода", "Небесне Переміщення"],
        correctAnswer: 1
      },
      {
        question: "Хто є власником найбільшої відомої нагороди в світі One Piece?",
        options: ["Кайдо", "Шарлотта Лінлін", "Едвард Ньюгейт", "Гол Д. Роджер"],
        correctAnswer: 1
      },
      {
        question: "Яка назва техніки Ло, яка дозволяє йому міняти місцями об'єкти?",
        options: ["Радіо Найф", "Шемблз", "Гамма Найф", "Каунтер Шок"],
        correctAnswer: 1
      },
      {
        question: "Хто є автором манги One Piece?",
        options: ["Масаші Кішімото", "Ейічіро Ода", "Тіте Кубо", "Акіра Торіяма"],
        correctAnswer: 1
      },
      {
        question: "Яка назва найсильнішої форми Хакі?",
        options: ["Бусошоку Хакі", "Кенбуншоку Хакі", "Хаошоку Хакі", "Рьо"],
        correctAnswer: 2
      }
    ]
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[difficulty][currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions[difficulty].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizStarted(false);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setDifficulty('');
  };

  return (
    <PageContainer>
      <Title>Ласкаво просимо до світу One Piece!</Title>

      <Section>
        <h2>Вікторина One Piece</h2>
        {!quizStarted ? (
          <>
            <Button onClick={() => handleDifficultySelect('easy')}>Легкий (5 питань)</Button>
            <Button onClick={() => handleDifficultySelect('medium')}>Середній (10 питань)</Button>
            <Button onClick={() => handleDifficultySelect('hard')}>Важкий (15 питань)</Button>
          </>
        ) : (
          <QuizContainer>
            <h3>{questions[difficulty][currentQuestion].question}</h3>
            {questions[difficulty][currentQuestion].options.map((option, index) => (
              <Button key={index} onClick={() => handleAnswer(index)}>{option}</Button>
            ))}
          </QuizContainer>
        )}
        {!quizStarted && score > 0 && (
          <>
            <p>Ваш результат: {score} з {questions[difficulty].length}</p>
            <Button onClick={restartQuiz}>Спробувати ще раз</Button>
          </>
        )}
      </Section>
    </PageContainer>
  );
};

export default OnePiece;