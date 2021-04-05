export default function Dashboard() {
  return (
    <>
      <main className="three-col-layout">
        <div className="user-teams">
          <ul>
            <li>Team 1</li>
            <li>Team 1</li>
            <li>Team 1</li>
            <li>Team 1</li>
            <li>Team 1</li>
          </ul>
        </div>
        <div className="team-vaults">
          <ul>
            <li>Vault 1</li>
            <li>Vault 1</li>
            <li>Vault 1</li>
            <li>Vault 1</li>
            <li>Vault 1</li>
          </ul>
        </div>
        <div className="vault-data">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sint
            consequuntur consectetur vero ullam architecto, veniam modi laboriosam qui
            tenetur praesentium odit. Asperiores ea doloremque provident dolores velit
            expedita laboriosam?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sint
            consequuntur consectetur vero ullam architecto, veniam modi laboriosam qui
            tenetur praesentium odit. Asperiores ea doloremque provident dolores velit
            expedita laboriosam?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sint
            consequuntur consectetur vero ullam architecto, veniam modi laboriosam qui
            tenetur praesentium odit. Asperiores ea doloremque provident dolores velit
            expedita laboriosam?
          </p>
        </div>
      </main>

      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 1em;
        }
        li:hover {
          background-color: gray;
        }

        .three-col-layout {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(100px, auto);
        }

        .user-teams {
          grid-column: 1 / 3;
        }

        .team-vaults {
          grid-column: 3 / 6;
        }

        .vault-data {
          grid-column: 6 / 12;
        }
      `}</style>
    </>
  );
}
