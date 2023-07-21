import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [nameToUpdate, setNameToUpdate] = useState("");
    const [emailToUpdate, setEmailToUpdate] = useState("");
    const [userIdToUpdate, setUserIdToUpdate] = useState("");
    const [userIdToDelete, setUserIdToDelete] = useState("");

    // Api functions
    const fetchAllUsers = api.example.getAll.useQuery();
    // const fetchOneUser = api.example.getOne.useQuery({ id: userId });

    const createUserMutation = api.example.createUser.useMutation();
    const updateUserMutation = api.example.updateUser.useMutation();
    const deleteUserMutation = api.example.deleteUser.useMutation();

    const handleFetchUsers = async () => {
        try {
            await fetchAllUsers.refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateUser = async () => {
        try {
            await createUserMutation.mutateAsync({
                name,
                email,
            });
            setName("");
            setEmail("");

            await fetchAllUsers.refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await updateUserMutation.mutateAsync({
                id: userIdToUpdate,
                name: nameToUpdate,
                email: emailToUpdate,
            });
            setNameToUpdate("");
            setEmailToUpdate("");
            setUserIdToUpdate("");

            await fetchAllUsers.refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteUpdateUser = async () => {
        try {
            await deleteUserMutation.mutateAsync({
                id: userIdToDelete,
            });
            setUserIdToDelete("");

            await fetchAllUsers.refetch();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mx-auto p-8">
            <div className="mb-8">
                <h2
                    className="mb-4 text-2xl font-bold"
                    onClick={() => handleFetchUsers}
                >
                    Get all users
                </h2>
                <button className="rounded bg-blue-500 px-4 py-2 text-white">
                    Get all users
                </button>
                <div className="text- mb-4 mt-4 grid  grid-cols-3 gap-4 font-bold">
                    <p>id</p>
                    <p>name</p>
                    <p>email</p>
                </div>
                <div>
                    {fetchAllUsers.data?.map((user) => {
                        return (
                            <>
                                <p>{user.id}</p>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
