import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import MemberList from "../../components/member/MemberList";
import { Member } from "../../entities/Member";
import { getMemberList } from "../../services/memberService";

/**
 * Member component representing the member page.
 * @returns {React.JSX.Element} The rendered member page component.
 */

const MemberPage = (): React.JSX.Element => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Member[] = await getMemberList();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Member Page | Vite Modular App</title>
      </Helmet>
      <MemberList members={members} />
    </>
  );
};

export default MemberPage;
