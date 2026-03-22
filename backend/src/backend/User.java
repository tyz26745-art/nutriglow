package backend;

public class User {
    public long id;
    public String name;
    public String email;
    public String pass;
    public String joined;

    public User(long id, String name, String email, String pass, String joined) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.joined = joined;
    }
}
