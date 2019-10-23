exports.hello = (req, res) => {
    const { age, name } = req.query;
    res.status(200).json({ example: 'is-working', age, name });
};

exports.test = (req, res) => {
    const { name } = req.body;

    // if (!name) {
    //     return res.status(400).send({
    //         error: true,
    //         statusCode: 400,
    //         description: 'Name parameter not passed along in the request body'
    //     })
    // }
    return res.status(200).json({ hello: `${name || 'stranger!'}` });
};
