import ItemCard from "@/compontens/ItemCard";
import ItemForm from "@/compontens/ItemForm";
import itemForm from "@/compontens/ItemForm";

export default async function Home() {
  const Item = await fetch("http://localhost:3000/api/Item/")
    .then((response) => response.json())
    .catch((error) => {
      console.log("failed to get items", error);
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Items</h1>
      <section className="flex flex-col items-center justify-center gap-2">
        {Item && Item.map((Item) => <ItemCard key={Item.id} Item={Item} />)}
      </section>
    </main>
  );
}
