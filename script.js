const BIN_URL="https://api.jsonbin.io/v3/b/68cd920e43b1c97be948669f"
const API_KEY="$2a$10$r6Np3dFHNRsOA4YutneRoedrRSc2US/weLhJBOSLZYLzamW85/zjW"
const output=document.getElementById("output");

async function getData() {
const res = await fetch(BIN_URL,
    {headers:{"X-Master-Key": API_KEY}}
);

const data = await res.json();
const singleAffiliate = data.record.affiliates.map(
    a =>
        `
            <li>
                ${a.fName} ${a.lName} (${a.isStudent ? "Student":"Not Student"})
            </li>
        `
);
output.innerHTML+=singleAffiliate;
}