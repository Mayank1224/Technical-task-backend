const Contact = require('../models/contact');

exports.contactUs = async (req, res) => {
    const { email, description } = req.body;

    // Validate input
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Save contact information to the database
        await Contact.create({ email, description });

        res.json({ message: 'Contact information saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
