import {  ref, onValue, off } from "firebase/database";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss";
import {  database, auth } from "./firebase/firebase";
     
const Listes = () => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [status, setStatus] = useState({});
    const [counter, setCounter] = useState(0)
    

    function firstSubmit(userId) {
        setStatus(prev =>({...prev, [userId]: "Present"}));
        
    };
    function secondSubmit(userId) {
        setStatus(prev =>({...prev, [userId]: "Absent"}));
        
    }

    useEffect(() => {
        
        const usersRef = ref(database, "users");
        
        
        onValue(usersRef, (snapshot) => {
            setLoading(false);
            if (snapshot.exists()) {
                setUsers(snapshot.val());
            } else {
                setUsers({});
            }
        }, (error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        });

        
        return () => {
            off(usersRef);
        };
    }, []);
    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="parent w-full max-w-6xl mx-auto p-4 md:p-10">
            <div className="container mx-auto p-4 md:p-6">
                <div className="flex justify-around items-center mb-6">
                <button 
                            
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save as PDF
                        </button>
                    <h2 className="text-2xl font-bold">Registration Lists</h2>
                    <button 
                        onClick={handleSignOut}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Sign Out
                    </button>
                </div>
                <p className="text-center mb-6 md:mb-10 text-amber-300 font-bold">Created by DERRADJI AMINE ABDELBASSET</p>
                <div className="parent  w-50 h-15 bg-blue-700 border border-blue-700 rounded-lg text-white justify-self-center mb-10"><p className="text-center mb-6 md:mb-10  font-bold   h-15 p-1  justify-self-center"> Number of Attendees : {counter}/{Object.keys(users).length}</p></div>
                
                {loading ? (
                    <p className="text-center py-4">Loading data...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border">No.</th>
                                    <th className="py-2 px-4 border">Full Name</th>
                                    <th className="py-2 px-4 border">Email</th>
                                    <th className="py-2 px-4 border">Activity</th>
                                    <th className="py-2 px-4 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(users).length > 0 ? (
                                    Object.keys(users).map((id, index) => (
                                        <tr key={id}>
                                            <td className="py-2 px-4 border">{index + 1}</td>
                                            <td className="py-2 px-4 border"><strong>{users[id].name}</strong></td>
                                            <td className="py-2 px-4 border">{users[id].email}</td>
                                            <td className="py-2 px-4 border">{users[id].act}</td>
                                            <td className="py-2 px-4 border">
                                                {status[id] ? (<p className="py-2 px-4 text-center">{status[id]}</p>): (                                                
                                                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                                    <button onClick={() =>{firstSubmit(id);setCounter(counter + 1)}} className="bg-green-500 hover:bg-green-600 text-white border rounded p-2 text-sm">Present</button>
                                                    <button onClick={() =>{secondSubmit(id)}} className="bg-red-500 hover:bg-red-600 text-white border rounded p-2 text-sm">Absent</button>
                                                    </div>)}

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-2 px-4 border text-center">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Listes;
