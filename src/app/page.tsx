"use client";

// import Link from "next/link";
// import { db } from "@/db";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { Loader2, Square } from "lucide-react";
import Nav from "@/components/ui/Nav";

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
    const colorVariants = {
        Simplifying: { color: "#7B5AFF" },
        Action: { color: "#7B5AFF" },
    };
    return (
        <div>
            <Nav />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {" "}
                <div className="hero">
                    <div className="container">
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
                                                duration: 1,
                                                ease: "easeOut",
                                            }}
                                            style={{
                                                color: colorVariants[word],
                                            }}
                                        >
                                            <h1>{word}</h1>
                                        </motion.div>
                                    ))}{" "}
                                </span>
                                <span>
                                    {["so you can", "Focus on Action"].map(
                                        (word, index) => (
                                            <motion.div
                                                key={index}
                                                variants={wordVariants}
                                                transition={{
                                                    duration: 1,
                                                    ease: "easeOut",
                                                }}
                                                style={{
                                                    color: colorVariants[word],
                                                }}
                                            >
                                                <h1>{word}</h1>
                                            </motion.div>
                                        ),
                                    )}{" "}
                                </span>
                            </div>
                            <p>
                                get <span>meaningful</span> legislative updates
                                with just one click.
                            </p>
                        </motion.div>
                    </div>
                </div>
                <section>
                    <div className="container">
                        <Tag
                            // backgroundColor = ''
                            tagName="features"
                        />
                        <h2>Here are our features</h2>
                        <div className="grid-row">
                            <div>asdf</div>
                            <div>asdf</div>
                            <div>asdf</div>
                        </div>
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
