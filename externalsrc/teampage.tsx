function TeamPage() {
    type TeamMember = {
        name: string
        role: string
        twitter: string
    }

    const teamMembers: TeamMember[] = [
        {
            name: "Alice Johnson",
            role: "Co-Founder, Tech Lead",
            twitter: "@alice_j",
        },
        {
            name: "Bob Smith",
            role: "Product Manager",
            twitter: "@bob_smith",
        },
        {
            name: "Charlie Wang",
            role: "Blockchain Developer",
            twitter: "@charlie_w",
        },
        {
            name: "Diana Moore",
            role: "Marketing Lead",
            twitter: "@diana_m",
        },
        {
            name: "Ethan Brooks",
            role: "UX Designer",
            twitter: "@ethan_b",
        },
        {
            name: "Fiona Green",
            role: "Community Manager",
            twitter: "@fiona_g",
        },
    ]
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(to bottom, #e9f5f9, #edf2f7)",
                padding: "2rem",
            }}
        >
            <h1
                style={{
                    fontSize: "3rem",
                    fontWeight: "700",
                    color: "#2d3748",
                    marginBottom: "3rem",
                    textAlign: "center",
                    letterSpacing: "1px",
                }}
            >
                Meet the Team
            </h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2.5rem",
                    width: "100%",
                    maxWidth: "1200px",
                }}
            >
                {teamMembers.map((member) => (
                    <div
                        key={member.name}
                        style={{
                            backgroundColor: "#fff",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                            borderRadius: "1rem",
                            padding: "2.5rem",
                            textAlign: "center",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)"
                            e.currentTarget.style.boxShadow = "0 15px 25px rgba(0, 0, 0, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"
                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: "#2d3748",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {member.name}
                        </h2>
                        <p
                            style={{
                                color: "#718096",
                                margin: "0 0 1.5rem",
                                fontSize: "1rem",
                            }}
                        >
                            {member.role}
                        </p>
                        <a
                            href={`https://twitter.com/${member.twitter.slice(1)}`}
                            style={{
                                color: "#1DA1F2",
                                fontSize: "1rem",
                                textDecoration: "none",
                                transition: "color 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#0d8ddb")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#1DA1F2")}
                        >
                            {member.twitter}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}