namespace webApi.Entities
{
    public class Artister
    {
        public int Id {get; set;}
        public string Namn {get; set;}
        public string Beskrivning {get; set;}

        public ICollection<Album> Album {get; set;}
    }
}