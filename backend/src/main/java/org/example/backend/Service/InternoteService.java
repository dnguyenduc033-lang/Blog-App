package org.example.backend.Service;

import org.example.backend.Model.Internote;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InternoteService
{
    public Internote AddInternote(Internote internote);
    public Internote UpdateInternote(Internote internote);
    public void DeleteInternote(Internote internote);
    public Internote GetInternoteById(Long id);
    public List<Internote> GetAllInternote();

}
