"use client";

// import Link from "next/link";
// import { db } from "@/db";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { Loader2, Square } from "lucide-react";
import Nav from "@/components/ui/Nav";
import Link from 'next/link'
import "./globals.sass";

import Tag from "@/components/ui/Tag";
import { motion } from "framer-motion";

export default function Home() {
    // const { getUser } = getKindeServerSession();
    // const user = await getUser();

    // const dbUser = user
    //     ? await db.user.findFirst({
    //           where: {
    //               id: user?.id,
    //           },
    //       })
    //     : null;
    const wordVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
    };
    // const colorVariants = {
    //     Simplifying: "#7B5AFF",
    //     Simplifying: string,
    //     Action: "#7B5AFF",
    // };
    return (
        <div>
            <Nav />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.05, ease: "easeOut" }}
            >
                <div className="hero">
                    <div className="container">
                        {/* background image */}
                        <div className="hero-image">
                            <img src="./landingPolitica.svg" />
                        </div>

                        <div className="hero-text-contain">
                            <div className="subheading-header-contain">
                                <a href="">
                                    <p>
                                        <span>NEW</span>&nbsp; Start
                                        understanding your government
                                    </p>
                                    <img src="./arrowRightBlack.png" />
                                </a>
                            </div>
                            {/* heading title */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="title-contain">
                                    <span>
                                        {[
                                            "Simplifying",
                                            "Legislative",
                                            "Bills",
                                        ].map((word, index) => (
                                            <motion.div
                                                key={index}
                                                variants={wordVariants}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeOut",
                                                    // delay: 0.25,
                                                }}
                                                style={{
                                                    color:
                                                        word === "Simplifying"
                                                            ? "#7B5AFF"
                                                            : "",
                                                }}
                                            >
                                                <h1>{word}</h1>
                                            </motion.div>
                                        ))}{" "}
                                    </span>
                                    <span>
                                        {[
                                            "so you can",
                                            "Focus on",
                                            "Action",
                                        ].map((word, index) => (
                                            <motion.div
                                                key={index}
                                                variants={wordVariants}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeOut",
                                                    // delay: 0.25,
                                                }}
                                                style={{
                                                    color:
                                                        word === "Action"
                                                            ? "#7B5AFF"
                                                            : "#7B5AFF",
                                                }}
                                            >
                                                <h1>{word}</h1>
                                            </motion.div>
                                        ))}{" "}
                                    </span>
                                </div>
                                <p>
                                    get meaningful legislative updates with just
                                    one click.
                                </p>
                                <div
                                    style={{
                                        width: "100%",
                                        justifyContent: "center",
                                        marginTop: "5vh",
                                        display: "flex",
                                    }}
                                >
                                    <div
                                        className="flex-row"
                                        style={{
                                            gap: "22px",
                                            display: "flex",
                                            flexDirection: "row",
                                            marginBottom: "5vh",
                                        }}
                                    >
                                        <button
                                            className="secondary"
                                            style={{ fontSize: "28px" }}
                                        >
                                            <Link href = "/act" >
                                               Demo
                                            </Link>
                                           
                                        </button>
                                        <button
                                            className="primary"
                                            style={{ fontSize: "28px" }}
                                        > <Link href = "/act" >
                                            Start now
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                                {/* key features */}
                                <div className="features">
                                    <Tag tagName="Key features" />
                                    <h1>
                                        Legislation makes no sense.
                                        <br />
                                        Let’s change that.
                                    </h1>
                                </div>
                                {/* feature items */}
                                <div className="feature-container">
                                    <div className="feature-contain">
                                        <div className="feature-item">
                                            <img
                                                src="./micPolitica.svg"
                                                alt=""
                                            />
                                            <h2>Disability Accommodations</h2>
                                            <p>
                                                personalized accessibility aid
                                                for anyone on the internet
                                            </p>
                                        </div>
                                        <div className="feature-item">
                                            <img
                                                src="./wordingPolitica.svg"
                                                alt=""
                                            />
                                            <h2>Straightforward wording</h2>
                                            <p>
                                                turning convoluted legislation
                                                into understandable speech.
                                            </p>
                                        </div>
                                        <div className="feature-item">
                                            <img
                                                src="./resourcesPolitica.svg"
                                                alt=""
                                            />
                                            <h2>Actionable resources</h2>
                                            <p>
                                                resources, protests, and
                                                advocacy groups to take action
                                                on legislation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* visual feature grids */}
                                <div className="feature-grid-contain">
                                    <h2
                                        style={{
                                            marginBottom: "12px",
                                            marginLeft: "50px",
                                        }}
                                    >
                                        Features
                                    </h2>
                                    <img
                                        src="livePolitica.svg"
                                        style={{ marginBottom: "36px" }}
                                        className="imgHover"
                                    />
                                    <div
                                        className="flex flex-row"
                                        style={{ gap: "36px" }}
                                    >
                                        <img src="./leftPolitica.svg" className="imgHover" />
                                        <img
                                            src="./mobilePolitica.svg"
                                            alt=""
                                            className="imgHover"
                                        />
                                    </div>
                                </div>
                                <div className="holistic-contain">
                                    <div
                                        style={{
                                            width: "100%",
                                            justifyContent: "center",
                                            display: "flex",
                                            marginBottom: "5vh",
                                        }}
                                    >
                                        <div
                                            className="tag"
                                            style={{
                                                color: "#CA5AFF",
                                                backgroundColor: "#FAEFFF",
                                            }}
                                        >
                                            core functionality
                                        </div>
                                    </div>

                                    <h1>Holistic Accessibility</h1>
                                    <img src="./holisticPolitica.svg" alt="" />
                                </div>
                                <div className="cta">
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "12px",
                                        }}
                                    >
                                        <h1>
                                            <span>Start leading</span> the voice
                                            behind legislation.
                                        </h1>
                                        <p>
                                            No waiting, no confusing, just pure
                                            action and impact.
                                        </p>
                                    </div>

                                    <div
                                        style={{
                                            width: "100%",
                                            justifyContent: "center",
                                            alignContent: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <button
                                            className="primary"
                                            style={{
                                                fontSize: "24px",
                                                marginTop: "36px",
                                            }}
                                        >
                                             <Link href = "/act" >
                                            Start now</Link>
                                        </button>
                                    </div>
                                </div>
                                {/* footer */}
                                <div className="footer">
                                    <div className="hr border border-gray-300">
                                        <hr />{" "}
                                    </div>
                                    <p
                                        className="font-semibold flex flex-center justify-center items-center text-center p-5"
                                        style={{
                                            width: "100vw",
                                            borderTop: "4px solid #D8DBE3",
                                        }}
                                    >
                                        made with 💖 & lots of ☕️ @ UCLA
                                    </p>
                                </div>
                                {/* <Tag tagName="Key features" /> */}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
