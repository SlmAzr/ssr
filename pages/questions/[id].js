import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import Card from "@/components/card/Card"

const QuestionDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`

function QuestionDetail() {
    const router = useRouter()
    const { id } = router.query
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.stackexchange.com/2.2/questions/${id}?order=desc&sort=activity&site=stackoverflow`)
            const result = await res.json()
            if (result) {
                setQuestion(result.items)
                setLoading(false)
            }
        }
        id && fetchData()
    }, [id])
  return (
    <QuestionDetailContainer>
      <h2>Question: {id}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card
          key={question.question_id}
          title={question.title}
          views={question.view_count}
          answers={question.answer_count}
        />
      )}
    </QuestionDetailContainer>
  )
}

export default QuestionDetail