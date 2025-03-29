import logo from "../assets/profile.png";
import Headbar from "../component/Headbar";

export default function Profile({ likeCount }) {
    return (
        <div className="flex flex-col">
            <Headbar />
            <div className="flex items-center bg-[#31515C] text-white p-10 w-full">
                <div className="flex flex-col items-center w-1/3">
                    <img src={logo} alt="Profile" className="rounded-full border-2 border-white" />
                    <p className="mt-2 text-2xl font-extrabold">username</p>
                </div>

                <div className="flex flex-grow justify-self-start space-x-40 text-center">
                    <div className="translate-x-60">
                        <p className="text-5xl font-medium">212</p>
                        <p className="text-2xl font-bold">Post</p>
                    </div>
                    <div className="translate-x-96">
                        <p className="text-5xl font-medium">{likeCount}</p>
                        <p className="text-2xl font-bold">Like</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
