import React, { useState } from 'react';
import './add_depot.css'; // Keep your existing styles
import { useNavigate } from 'react-router-dom';

const AddDepot = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bus_number: '',
        d_name: '',
        to: '',
        from: '',
        bus_route: '',
        driver: '',
        conductor: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async () => {
        // Map frontend fields to backend DTO
        const payload = {
            depotName: formData.d_name,
            busNumber: formData.bus_number,
            route: formData.bus_route,
            fromLocation: formData.from,
            destination: formData.to
        };

        try {
            const response = await fetch('http://localhost:8080/api/depots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Depot created:', data);
                alert('Depot added successfully!');
                // Reset form after successful submission
                setFormData({
                    bus_number: '',
                    d_name: '',
                    to: '',
                    from: '',
                    bus_route: '',
                    driver: '',
                    conductor: '',
                });
            } else {
                const err = await response.json();
                alert('Error: ' + (err.error || 'Could not create depot'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to backend');
        }
    };

    return (
        <div className="bus-container">
            <h1 className="bus-title">Smart Public Bus Management System</h1>

            {/* Navigation Tabs */}
            <div className="tabs1">
                <div className="tabs">
                    <button className="tab active">Admin Dashboard</button>
                    <button className="tab">Staff Interface</button>
                    <button className="tab">Passenger Portal</button>
                </div>
            </div>

            <div className="form-container-depot">
                <div className="form-header-depot">
                    <h2 className="form-title">Add Depot</h2>
                </div>

                <div className="form-content-depot">

                    <div className="row">
                        <div className="form-group-depot">
                            <label className="l-depot">Depot Name:</label>
                            <input className="input-color-depot"
                                type="text"
                                name="d_name"
                                value={formData.d_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group-depot">
                            <label className="l-depot">Bus Number:</label>
                            <input className="input-color-depot"
                                type="text"
                                name="bus_number"
                                value={formData.bus_number}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group-depot">
                            <label className="l-depot">To:</label>
                            <input className="input-color-depot"
                                type="text"
                                name="to"
                                value={formData.to}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group-depot">
                            <label className="l-depot">From:</label>
                            <input className="input-color-depot"
                                type="text"
                                name="from"
                                value={formData.from}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group-depot">
                            <label className="l-depot">Bus Route:</label>
                            <input className="input-color-depot"
                                type="text"
                                name="bus_route"
                                value={formData.bus_route}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="button-container">
                        <button className="back-button" onClick={() => navigate("/admin/dashboard")}>
                            Back
                        </button>
                        <button className="register-button" onClick={handleRegister}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDepot;
