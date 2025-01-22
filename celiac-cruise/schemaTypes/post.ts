export default {
    name: "post",
    type: "document",
    title: "Post",
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "content",
            type: "text",
            title: "Content",
        },
        {
            name: "publishedAt",
            type: "datetime",
            title: "Published At",
        },
    ],
};
