namespace webApi.Entities
{
    public class Album
    {
        public int Id {get; set;}
        public string Namn {get; set;}
        public int Publicerad {get; set;}
        public int ArtisterId {get; set;}
        
        public Artister Artister { get; set; }
        public ICollection<Låtar> Låtar {get; set;}
    }
}