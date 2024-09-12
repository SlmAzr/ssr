import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "@/components/card/Card";
import Link from "next/link";
import Pagination from "@/components/Pagination";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5%;
`;

const CardLink = styled.a`
  text-decoration: none;
`;

function Questions({ questions, hasMore, page }) {
   
    console.log('page', page)
  return (
    <QuestionContainer>
      <div>
        {Array.isArray(questions) &&
          questions.map((question) => (
            <Link
              key={question.question_id}
              href={`/questions/${question.question_id}`}
              passHref
            >
              <CardLink>
                <Card
                  key={question.question_id}
                  title={question.title}
                  views={question.view_count}
                  answers={question.answer_count}
                />
              </CardLink>
            </Link>
          ))}
      </div>
      <Pagination currentPage={parseInt(page) || 1} hasMore={hasMore} />
    </QuestionContainer>
  );
}
export async function getServerSideProps(context) {
  const { page } = context.query;
  console.log('page', page)
  const data = await fetch(
    `https://api.stackexchange.com/2.2/questions?${page?`page=${page}&` : ""}order=desc&sort=hot&tagged=react&site=stackoverflow`
  );
  const result = await data.json();
  return {
    props: {
      questions: result.items,
      hasMore: result.has_more,
      page: page || 1,
    },
  };
}

export default Questions;
