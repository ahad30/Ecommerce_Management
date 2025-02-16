import React from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css'; // Ensure PrimeReact theme is imported
import 'primereact/resources/primereact.min.css'; // Ensure PrimeReact core CSS is imported
import { Button } from 'antd';

export default function OrderTrack() {
    const events = [
    { status: 'Order Placement', date: '30 January, 2021, 8:37 AM', icon:"A", color: '#4CAF50' },
    { status: 'Processing', date: '30 January, 2021, 8:37 AM', icon: "A", color: '#4CAF50' },
    { status: 'Shipping', date: '30 January, 2021, 8:37 AM', icon: "A", color: '#4CAF50' },
    { status: 'Delivered', date: '30 January, 2021, 8:37 AM', icon: "A", color: '#4CAF50' }
];


const customizedMarker = (item) => {
    return (
        <span
            className="flex w-[2rem] h-[2rem] items-center justify-center text-white border-circle z-1 shadow-1"
            style={{ backgroundColor: item.color }}
        >
            {item.icon}
        </span>
    );
};

    const customizedContent = (item) => {
        return (
            <Card className='mb-5 lg:mb-0' title={item.status} subTitle={item.date}>
                <p>Your order has been {item.status.toLowerCase()}.</p>
  
            </Card>
        );
    };

    return (
        <div className="card py-5">
            <h1 className="text-center">ORDER TRACKING</h1>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="orderId">Order ID *</label>
                    <input id="orderId" type="text" className="p-inputtext p-component" placeholder="Enter your Order Transaction  ID" />
                </div>
                <Button className="mb-10 mt-5 bg-[#3498DB] text-white">Track Order</Button>
            </div>
            <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
        </div>
    );
}