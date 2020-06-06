using TU.Core.Interfaces;

namespace MOM.RPT.Modules.Interfaces
{
    public interface IAppService : IMainWindowService
    {
        IApp App { get; }

    }
}
