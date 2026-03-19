artists = []

# Menu mapping:
# 1 - add artist
# 2 - remove artist
# 3 - save list
# 4 - load list
# 5 - quit


def add_artist():
    name = input("Artist name to add: ").strip()
    if name:
        artists.append(name)
        print(f"Added: {name}")
    else:
        print("No name entered.")


def remove_artist():
    name = input("Artist name to remove: ").strip()
    if name in artists:
        artists.remove(name)
        print(f"Removed: {name}")
    else:
        print("Artist not found.")


def save_list():
    try:
        with open("my_artists.txt", "w", encoding="utf-8") as f:
            for a in artists:
                f.write(a + "\n")
        print("Saved to my_artists.txt")
    except Exception as e:
        print("Error saving:", e)


def load_list():
    try:
        with open("my_artists.txt", "r", encoding="utf-8") as f:
            lines = [line.strip() for line in f if line.strip()]
        artists.clear()
        artists.extend(lines)
        print(f"Loaded {len(lines)} artists.")
    except FileNotFoundError:
        print("my_artists.txt not found.")
    except Exception as e:
        print("Error loading:", e)


def show_menu():
    while True:
        print("\nMenu:\n 1) Add artist\n 2) Remove artist\n 3) Save list\n 4) Load list\n 5) Quit")
        choice = input("Enter option number: ").strip()
        if choice == "1":
            add_artist()
        elif choice == "2":
            remove_artist()
        elif choice == "3":
            save_list()
        elif choice == "4":
            load_list()
        elif choice in ("5", "q", "quit", "exit"):
            print("Goodbye.")
            break
        else:
            print("Unknown option.")


if __name__ == "__main__":
    show_menu()
