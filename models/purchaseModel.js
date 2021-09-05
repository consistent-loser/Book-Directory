const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const purchaseSchema = mongoose.Schema({
    buyerID: {
        type:mongoose.Types.ObjectId ,
        required: true
    },

    bookID: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
});

const purchaseModel = new mongoose.model('saleData', purchaseSchema);

exports.saleData = purchaseModel;