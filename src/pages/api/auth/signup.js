import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name, email, password } = data;

  if (!email || !email.includes("@" || !password || password.length < 7)) {
    res.status(422).json({
      message: "Passord må inneholed mellom 8-16 tegn og inneholde minst en bokstav.",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({
    email: email,
  });

  if(existingUser) {
    res.status(422).json({message: 'Bruker finnes allerede!'});
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);

  const user = await db.collection('users').insertOne({
    name: name,
    email: email,
    lastActive: new Date().toString(),
    password: hashedPassword,
    image: '/images/empty-image.jpeg',
    emailVertified: null
  });
  res.status(201).json({ message: "Bruker opprettet!!" });

  client.close();
};

export default handler;
