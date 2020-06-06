using System.Collections.ObjectModel;
using System.Runtime.Serialization;
using System.Linq;

namespace SmartMom_Lib
{
    /// <summary>
    /// 파라메터 생성 시 사용
    /// </summary>
    [CollectionDataContract(ItemName = "Item")]
    public class TParameter : Collection<TParameterItem>
    {
        public int Seq { get; set; }

        public string SPNAME { get; set; }

        public int this[string key]
        {
            get
            {
                for(int idx=0; idx<Items.Count; idx++)
                {
                    if( key.Equals( Items[idx].ColumnId) )
                    {
                        return idx;
                    }
                }
                return -1;
            }
        }

        private TParameter() { }

        public TParameter(string spName)
        {
            SPNAME = spName;
            Seq = 0;
        }
    }
}
