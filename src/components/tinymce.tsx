import React, { Dispatch, SetStateAction } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Tinymce = (props: {
    initialValue: string;
    handleValueChange: Dispatch<SetStateAction<string>>;
}) => {
    const handleChange = (e: string) => {
        props.handleValueChange(e);
    };

    return (
        <div className="h-[100px]">
            <Editor
                apiKey="vgatbmul57ttlz4nsh56vwegtvqbnmzdwus9ynnti6zhbunw"
                init={{
                    plugins:
                        "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                    toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                    ],
                    ai_request: (
                        _request: unknown,
                        respondWith: {
                            string: (arg0: () => Promise<never>) => unknown;
                        },
                    ) =>
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                        respondWith.string(() =>
                            Promise.reject(
                                "See docs to implement AI Assistant",
                            ),
                        ),
                }}
                initialValue={props.initialValue}
                // onChange={handleChange}
                onEditorChange={handleChange}
            />
        </div>
    );
};

export default Tinymce;
