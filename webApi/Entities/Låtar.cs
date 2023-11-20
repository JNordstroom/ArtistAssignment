namespace webApi.Entities
{
    public class Låtar
    {
        public int Id {get; set;}
        public string Namn {get; set;}
        public int Placering {get; set;}
        public int Albumid {get; set;}

        public Album Album { get; set; }
    }
}