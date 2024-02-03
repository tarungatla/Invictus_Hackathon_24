import React from 'react';
import './css/OrderCard.css';

const OrderCard = ({ order }) => {
    const { orderNo, name, assignedBy, status } = order;

    const getStatusColor = () => {
        switch(status) {
            case 'pending':
                return 'orange';
            case 'completed':
                return 'green';
            default:
                return 'grey';
        }
    };

    return (
        <div className="order-card">
            <div className="order-info">
                <p><strong>Order No:</strong> {orderNo}</p>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Assigned By:</strong> {assignedBy}</p>
            </div>
            <div className="order-status">
                <span style={{ backgroundColor: getStatusColor() }}>{status}</span>
            </div>
        </div>
    );
};

export default OrderCard;
