using System.Collections.ObjectModel;

namespace TU.Core.Transfer
{
    /// <summary>
    /// 파라메터 생성 시 사용
    /// </summary>
    public class TParameter : Collection<TItem>
    {
        public int Seq { get; set; }

        public TParameter(int seq =0)
        {
            Seq = seq;
        }
    }
}
