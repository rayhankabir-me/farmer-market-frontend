import PostImage from "@/public/images/post-image.png";
import Image from "next/image";
import Link from "next/link";
export default function PostContent({ post }) {
  const { PostId, Title, Description, PostDate, User } = post;
  return (
    <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 px-4 pb-8">
      <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/posts/${PostId}`}>
          <Image
            width={800}
            height={500}
            className="rounded-t-lg"
            src={PostImage}
            alt="Post Image"
          />
        </Link>
        <div className="p-5">
          <Link href={`/posts/${PostId}`}>
            <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {Title}
            </h5>
          </Link>
          <div className="text-sm mb-4 flex items-center justify-between">
            <p className="text-gray-700 dark:text-gray-400">
              By:{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {User.UserName}
              </span>
            </p>
          </div>
          <p className="mb-8 font-normal text-gray-700 dark:text-gray-400">
            {Description}
          </p>

          <div className="flex items-center justify-between">
            <Link
              href={`/posts/${PostId}`}
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
            >
              Learn more
              <svg
                className=" w-2.5 h-2.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
