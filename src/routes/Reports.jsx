import { useState, useEffect } from "react";
import API_URL from "../auth/constants";
import { useAuth } from "../auth/AuthProvider";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import '../assets/styles/reports.css'
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar } from "recharts";

const Reports = () => {
    const { id } = useParams();
    const auth = useAuth();

    const [answers, setAnswers] = useState({})

    useEffect(() => {
        getAnswers();
    }, [])

    const getAnswers = async () => {
        const response = await fetch(`${API_URL}/results/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`
            }
        })

        if (response.ok) {
            const json = await response.json();
            setAnswers(json)
        }
    }

    const renderQuestionDivs = () => {
        const { uniqueAnswersOptionOpen, uniqueAnswersOptionUnica, uniqueAnswersOptionMultiple } = answers;
        const questionDivs = [];

        if (uniqueAnswersOptionOpen) {
            const uniqueQuestions = new Set();
            Object.keys(uniqueAnswersOptionOpen).forEach((question) => {
                const uniqueQuestion = question.split(":")[0].trim();
                uniqueQuestions.add(uniqueQuestion);
            });

            const uniqueDiv = Array.from(uniqueQuestions).map((question) => (
                <div key={question} className="container_report">
                    <h3>{question}</h3>
                    {renderAnswers(question)}
                    {renderGraphic(question)}
                </div>
            ));

            questionDivs.push(...uniqueDiv);
        }

        if (uniqueAnswersOptionUnica) {
            const uniqueQuestions = new Set();
            Object.keys(uniqueAnswersOptionUnica).forEach((question) => {
                const uniqueQuestion = question.split(":")[0].trim();
                uniqueQuestions.add(uniqueQuestion)
            })

            const uniqueDiv = Array.from(uniqueQuestions).map((question) => (
                <div key={question} className="container_report">
                    <h3>{question}</h3>
                    {renderAnswers(question)}
                    {renderGraphic(question)}
                </div>
            ))

            questionDivs.push(...uniqueDiv);
        }

        if (uniqueAnswersOptionMultiple) {
            const uniqueQuestions = new Set();
            Object.keys(uniqueAnswersOptionMultiple).forEach((question) => {
                const uniqueQuestion = question.split(":")[0].trim();
                uniqueQuestions.add(uniqueQuestion)
            })

            const uniqueDiv = Array.from(uniqueQuestions).map((question) => (
                <div key={question} className="container_report">
                    <h3>{question}</h3>
                    {renderAnswers(question)}
                    {renderGraphic(question)}
                </div>
            ))

            questionDivs.push(...uniqueDiv);
        }

        return questionDivs;
    };

    const renderGraphic = (question) => {
        const { uniqueAnswersOptionUnica, uniqueAnswersOptionMultiple } = answers;

        if (uniqueAnswersOptionUnica) {
            const data = Object.entries(uniqueAnswersOptionUnica)
                .filter(([key]) => key.split(":")[0].trim() === question)
                .map(([key, count]) => ({
                    respuesta: key.split(":")[1].trim(),
                    repeticiones: count
                }));

            if (data.length > 0) {
                return (
                    <ResponsiveContainer width="100%" aspect={2}>
                        <BarChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="4 1 2" />
                            <XAxis dataKey="respuesta" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="repeticiones" fill="#5D89BF" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            }
        }

        if (uniqueAnswersOptionMultiple) {
            const data = Object.entries(uniqueAnswersOptionMultiple)
                .filter(([key]) => key.split(":")[0].trim() === question)
                .map(([key, count]) => ({
                    respuesta: key.split(":")[1].trim(),
                    repeticiones: count
                }));

            if (data.length > 0) {
                return (
                    <ResponsiveContainer width="100%" aspect={2}>
                        <BarChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="4 1 2" />
                            <XAxis dataKey="respuesta" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="repeticiones" fill="#25B7B5" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            }
        }

        return null;
    }

    const renderAnswers = (question) => {
        const { uniqueAnswersOptionOpen } = answers;
        return Object.entries(uniqueAnswersOptionOpen).map(([key, count]) => {
            const [q, answer] = key.split(":").map((item) => item.trim());
            if (q === question) {
                return (
                    <p key={key}>
                        {answer} - Total respuestas: {count}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <>
            <Header />
            <div className="container_reports container">{renderQuestionDivs()}</div>
        </>
    )
}

export default Reports;
