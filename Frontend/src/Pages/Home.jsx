import { useContext } from "react";
import { AuthContext } from "../Context/Auth";
import Typography from "@mui/material/Typography";

export const Home = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Typography variant="p">Loading...</Typography>;
    }

    return (
        <>
            {user ? (
                <div>
                    <Typography variant="h1" className="text-center">
                        {user.username}
                    </Typography>
                </div>
            ) : (
                <Typography variant="p">Please log in</Typography>
            )}
        </>
    );
};