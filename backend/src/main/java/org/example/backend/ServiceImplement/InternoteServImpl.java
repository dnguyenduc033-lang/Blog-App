package org.example.backend.ServiceImplement;

import org.example.backend.Model.Internote;
import org.example.backend.Repository.InternoteRepo;
import org.example.backend.Service.InternoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class InternoteServImpl implements InternoteService {
    @Autowired
    private InternoteRepo repo;

    @Override
    public Internote AddInternote(Internote internote) {
        return  repo.save(internote);
    }

    @Override
    public Internote UpdateInternote(Internote internote) {
        return repo.save(internote);
    }

    @Override
    public void DeleteInternote(Internote internote) {
        repo.delete(internote);
    }

    @Override
    public Internote GetInternoteById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<Internote> GetAllInternote() {
        return repo.findAll();
    }

}
