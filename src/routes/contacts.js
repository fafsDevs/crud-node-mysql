const { Router } = require('express');
const router = Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/authentication');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('contacts/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { name, url, description, address, phone, email } = req.body;
    const newContact = {
        name,
        url,
        description,
        address,
        phone,
        email
    };
    await pool.query('INSERT INTO contacts set ?', [newContact]);
    req.flash('success', 'Post saved successfully');
    res.redirect('/contacts');
});

router.get('/', isLoggedIn, async (req, res) => {
    const contacts = await pool.query('SELECT * FROM contacts');
    res.render('contacts/list', { contacts });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE ID = ?', [id]);
    req.flash('success', 'Post deleted successfully');
    res.redirect('/contacts');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const contacts = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    res.render('contacts/edit', { contact: contacts[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { name, description, url, address, phone, email } = req.body;
    const newLink = {
        title,
        description,
        url,
        phone,
        address, 
        email
    };
    console.log(newContact);
    await pool.query('UPDATE contacts set ? WHERE id = ?', [newContact, id]);
    req.flash('success', 'Post updated successfully');
    res.redirect('/contacts');
});

module.exports = router;